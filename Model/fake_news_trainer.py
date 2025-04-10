import pandas as pd
import torch
from datasets import Dataset
from transformers import AutoTokenizer, BertForSequenceClassification, Trainer, TrainingArguments
from sklearn.metrics import accuracy_score, f1_score
from tqdm import tqdm
from transformers import TrainingArguments, Trainer

#pip install transformers datasets scikit-learn pandas torch tqdm

# ======== CONFIG ========
MODEL_NAME = "bert-base-uncased"
NUM_LABELS = 6  # (true, mostly-true, half-true, barely-true, false, pants-fire)
MAX_LEN = 128
BATCH_SIZE = 16
EPOCHS = 4
LABEL_MAP = {
    "true": 0,
    "mostly-true": 1,
    "half-true": 2,
    "barely-true": 3,
    "false": 4,
    "pants-fire": 5,
}

# ======== LOAD DATA ========
def load_data(path):
    df = pd.read_csv(path, sep="\t", header=None)
    df.columns = ["id", "label", "statement", "subject", "speaker", "job", "state", "party",
                  "barely_true", "false", "half_true", "mostly_true", "pants_on_fire", "context"]
    df = df[["statement", "label"]]
    df = df[df["label"].isin(LABEL_MAP)]  # Remove unknown labels
    df["label"] = df["label"].map(LABEL_MAP)
    return df

train_df = load_data("data/train.tsv")
val_df = load_data("data/valid.tsv")
test_df = load_data("data/test.tsv")

# ======== TOKENIZE ========
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)

def tokenize(batch):
    return tokenizer(batch["statement"], truncation=True, padding="max_length", max_length=MAX_LEN)

train_ds = Dataset.from_pandas(train_df).map(tokenize, batched=True).rename_column("label", "labels").remove_columns(["statement"])
val_ds   = Dataset.from_pandas(val_df).map(tokenize, batched=True).rename_column("label", "labels").remove_columns(["statement"])

# ======== MODEL ========
model = BertForSequenceClassification.from_pretrained(MODEL_NAME, num_labels=NUM_LABELS)

# ======== METRICS ========
def compute_metrics(pred):
    labels = pred.label_ids
    preds = pred.predictions.argmax(-1)
    return {
        "accuracy": accuracy_score(labels, preds),
        "f1": f1_score(labels, preds, average="weighted"),
    }

# ======== TRAINING SETUP ========
training_args = TrainingArguments(
    output_dir="./results",
    evaluation_strategy="epoch",
    per_device_train_batch_size=BATCH_SIZE,
    per_device_eval_batch_size=BATCH_SIZE,
    num_train_epochs=EPOCHS,
    logging_dir="./logs",
    save_strategy="epoch",
    load_best_model_at_end=True,
    metric_for_best_model="accuracy"
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_ds,
    eval_dataset=val_ds,
    compute_metrics=compute_metrics,
)

# ======== TRAIN! ========
trainer.train()

# Save your model
trainer.save_model("truth_detector_model")
tokenizer.save_pretrained("truth_detector_model")
