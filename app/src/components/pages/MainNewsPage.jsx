import Header from "../common/Header";
import newsImage from "../../assests/images/download.jpg";

export default function MainNewsPage() {
  return (
    <>
      <div className="news-container">
        {/* First News - 60% */}
        <div className="newsDiv first-news">
          <div className="news-content">
            <h3>This is the heading of the main news page</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Pariatur nostrum error aliquid dignissimos quos ipsum odit
              possimus quae mollitia et necessitatibus vitae quibusdam aperiam
              fuga repellendus, totam enim dolor. Cumque.
            </p>
          </div>
          <img src={newsImage} alt="newsImage" className="news-img" />
        </div>

        {/* Second News - 40% */}
        <div className="newsDiv second-news">
          <div className="news-content">
            <h3>This is the heading of the main news page</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Pariatur nostrum error aliquid 
            </p>
          </div>
          <img src={newsImage} alt="newsImage" className="news-img" />
        </div>
      </div>
      <div className="news-container">
        {/* First News - 60% */}
 

        {/* Second News - 40% */}
        <div className="newsDiv third-news">
          <div className="news-content">
            <h3>This is the heading of the main news page</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Pariatur nostrum error aliquid 
            </p>
          </div>
          <img src={newsImage} alt="newsImage" className="news-img" />
        </div>
        <div className="newsDiv fourth-news">
          <div className="news-content">
            <h3>This is the heading of the main news page</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Pariatur nostrum error aliquid dignissimos quos ipsum odit
              possimus quae mollitia et necessitatibus vitae quibusdam aperiam
              fuga repellendus, totam enim dolor. Cumque.
            </p>
          </div>
          <img src={newsImage} alt="newsImage" className="news-img" />
        </div>
      </div>

    </>
  );
}
