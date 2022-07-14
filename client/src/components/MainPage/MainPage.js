import Searchbar from "../Searchbar/Searchbar";
import Sidebar from "../Sidebar/Sidebar";
import catagories from "../../categories.json";
import "./MainPage.css";
import axios from "axios";
import ItemsRooms from "../ItemsRooms/ItemsRooms";
function MainPage() {

  return (
    <div className="container-main-page">
      <Searchbar />
      <div className="main-page">
        
        <div className="inner-grid">
          <div className="side-bar-container">
              <Sidebar catagories={catagories} />
          </div>
          <ItemsRooms/>    
        </div>
      </div>
    </div>
  );
}

export default MainPage;
