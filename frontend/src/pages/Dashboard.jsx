import Sidebar from "../components/Sidebar";
import PDFUploader from "../components/PDFUploader";
import ChatBox from "../components/ChatBox";
import wallpaper from "../assets/star-bg.png";

function Dashboard() {
  return (
    <div 
      className="min-h-screen"
      style={{
        backgroundImage: `url(${wallpaper})`,
        backgroundRepeat: 'repeat',
        backgroundSize: '300px',
      }}
    >
      <Sidebar />

      <div className="min-h-screen p-10 pt-16 overflow-y-auto">
        
      

        <PDFUploader />
        <ChatBox />

      </div>
    </div>
  );
}

export default Dashboard;