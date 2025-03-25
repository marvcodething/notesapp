'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tabContent = [
  { title: "NOTE TO SELF", text: "A digital notepad in the palm of our hands: a space for our grocery lists, passwords, diary entries, and a host of other purposes, meant only for our eyes. The Apple Notes app has become ubiquitous, and yet the ways individuals utilize this application varies widely. The Spring '25 cohort of MAC 242: Projects in Documentary Media invites you to explore the ways in which we utilize the Notes app, and how it takes shape in our daily lives. ", video: "", thumbnail: "/assets/thumbnails/mainThumbnail.jpg", date: "February 1, 2025 at 10:00AM" },
  { title: "The Killer - Bea Irwin", text: "The killer!!!", video: "https://youtu.be/Y02cmiDO4Jg", thumbnail: "/assets/thumbnails/beathumbnail.png", date: "February 15, 2025 at 2:30PM" },
  { title: "Writers Block - Eliana Joftus", text: "Idk maybe something like", video: "https://youtu.be/w7RkxP9lYoM", thumbnail: "/assets/thumbnails/ElianaJoftus-Thumbnail.jpg", date: "March 3, 2025 at 1:00PM" },
  { title: "Handwritten Note - Sara Masaki", text: "           ", video: "https://youtu.be/w3TzJzH7g3o", thumbnail: "/assets/thumbnails/masaki_thumbnail.png", date: "March 10, 2025 at 4:45PM" },
  { title: "My Notes App - Cielo", text: "January 1, 2025:", video: "https://youtu.be/fpV3l_d3PDo", thumbnail: "https://youtu.be/w3TzJzH7g3o", date: "January 1, 2025 at 9:15AM" },
  { title: "Birthday Planning - Luella Ottmann", text: "Night 1:\n   - CELEBRATE AT MIDNIGHT - wherever we are\n   - Surprise party at my quad\n      - Spiderman decoration...\n     - Cake for sure\n      - Hats!!!", video: "https://youtu.be/JAqi2tfQbys", thumbnail: "/assets/thumbnails/birthday.png", date: "March 5, 2025 at 11:30PM" },
  { title: "In The Script - Marvin Romero", text: "(just bought a new record) yeah this is my beater copy\n\nI want you to have s** with my wife\n\nGrady - this guy just told me you can put axe body spray on your butt and she can lick it and it tastes like alcohol - make sure you…", video: "https://youtu.be/AgeRE0JmzW8", thumbnail: "/assets/thumbnails/ROMERO_THUMBNAIL.jpeg", date: "February 28, 2025 at 3:00PM" },
  { title: "Handwrapping - Naomi Bahn-Logan", text: "Loop over thumb - wrist x3 - thumb x2 - wrist x1 - knuckles x3 - wrist x1 - pointer finger - middle - ring - pinky (cross pattern) - knuckles x1 - leftover goes to wrist", video: "https://youtu.be/P1WQIFMI1eI", thumbnail: "thumbnail8.jpg", date: "March 12, 2025 at 12:00PM" },
  { title: "Mourning While Living - Ruby King", text: "Dream Recording Oct 14, 2024\n\ni feel magga and the women she is now. for two nights in a row i visit her.\nfor two nights in a row a sob in my dream, i didn't even know that was possible.\nthis time mom and charles were there.\ni sobbed and said this is the year of regret", video: "https://youtu.be/nF0tfjGqZhw", thumbnail: "thumbnail9.jpg", date: "February 25, 2025 at 5:30PM" },
  { title: "Dj Songs - Ava Zagoria", text: "- Money trees X panda\n- Nokia x modern jam\n- Panda x still don't know my name", video: "https://youtu.be/4qf7FVyU9DM", thumbnail: "thumbnail10.jpg", date: "March 15, 2025 at 8:00AM" },
  { title: "Goals For Spring Break - Brown Schneider", text: "1. Take Bula for a walk\n2. Finally get a drivers license", video: "https://youtu.be/pIkkb5tqPpY", thumbnail: "thumbnail11.jpg", date: "February 5, 2025 at 6:00PM" },
  { title: "Outfit Ideas - Meg Tomonari", text: "- Black t-shirt\n- Jeans\n- White long shirt\n- Green sweater\n- Black dress", video: "https://youtu.be/QVY2ZPMrkJo", thumbnail: "thumbnail12.jpg", date: "March 20, 2025 at 10:30AM" },
  { title: "Remember Before You Play - Ella Sran", text: "The ball didn't sound as good or kick as well because it was flat, so grab the soccer pump before playing with Emma next time. That should make it sound better.", video: "https://youtu.be/Cx9NEvMG4l8", thumbnail: "thumbnail13.jpg", date: "February 10, 2025 at 7:45PM" },
  { title: "My (written) Notes App - Sloan Wittliff", text: "My notes app contains the most mundane things.\nBut buried between them are some of the most important things I've written for myself.", video: "https://youtu.be/5068t30k16o", thumbnail: "thumbnail14.jpg", date: "March 25, 2025 at 1:15PM" },
  { title: "Dreams - Jack Sabee-Paulson", text: "March 19 2025\n\nDream:", video: "https://youtu.be/4L9k02v07wI", thumbnail: "thumbnail15.jpg", date: "March 19, 2025 at 6:00AM" },
  { title: "Admin Day - Luca Sonne", text: "Laundry\nMeasure for measure act ii\n Clean room/bathroom\nTarget", video: "https://youtu.be/ceQw69-8zQU", thumbnail: "thumbnail16.jpg", date: "March 30, 2025 at 9:00AM" },
  { title: "Cookies - Lena Schindler", text: "flour\n2 eggs\nbutter\brown sugar, white sugar", video: "https://youtu.be/6Bk4qaJ_kCg", thumbnail: "thumbnail16.jpg", date: "March 30, 2025 at 9:00AM" },
  { title: "NOTE TO SELF", text: "Beyond the specific use profiled in individual site entries, students in class were surveyed about their other uses of the notes app.", video: "", thumbnail: "/assets/thumbnails/secondThumbnail.jpeg", date: "March 30, 2025 at 9:00AM" }
];

// First, create a helper function to check if the video is a YouTube URL
const isYouTubeUrl = (url) => url.includes('youtu.be') || url.includes('youtube.com');

// Function to convert YouTube URL to embed URL
const getYouTubeEmbedUrl = (url) => {
  if (url.includes('youtu.be')) {
    const videoId = url.split('youtu.be/')[1].split('?')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  return url;
};

export default function Home() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setShowContent(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTabClick = (tabIndex) => {
    setSelectedTab(tabIndex);
    if (isMobile) setShowContent(true);
  };

  const handleBack = () => {
    setShowContent(false);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section: Tabs */}
      <div
        className={`${isMobile ? (showContent ? "opacity-0 transition-opacity duration-300" : "w-full bg-neutral-800") : "w-1/4 bg-neutral-800 border-r-2"} text-white overflow-y-auto h-screen border-black border-x`}
      >
        <h1 className={`${isMobile ? "sticky top-0 z-50 bg-neutral-800":""} p-3 text-2xl font-extrabold font-sans`}>Notes</h1>
        <h1 className={`${isMobile ? "bg-neutral-800 top-12" : "sticky top-0 bg-neutral-800"} border-b border-gray-700 px-4 w-full flex mx-auto text-left py-2 font-bold z-40 opacity-97`}>
          Previous 30 Days
        </h1>
        <div className={`${isMobile ? "bg-neutral-800":"bg-neutral-800"} flex-auto`}>
          <div className="flex flex-col w-full">
            {tabContent.map((tab, i) => (
              <div
                key={i}
                onClick={() => handleTabClick(i)}
                className={`w-[80%] mx-auto ps-4 pe-2 py-4 text-left border-b border-gray-600 cursor-pointer ${
                  selectedTab === i ? (isMobile ? "text-white" : "bg-fuchsia-400 opacity-80 rounded-xl text-white") : ""
                } font-sans`}
                style={{ fontFamily: "'SF Pro Display', sans-serif" }}
              >
                <div className="font-bold z-6">{tab.title}</div>
                <div className="flex space-x-2">
                  <div className="text-sm text-gray-400">{tab.date.split(' at ')[1]}</div>
                  <div className="pl-1 text-sm text-gray-500 truncate">{tab.text.substring(0, 30)}...</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Section: Content */}
      {!isMobile && (
        <div className="w-3/4 bg-neutral-900 text-white overflow-y-auto h-screen">
          <div className="p-4">
            <h2 className="mb-2 text-sm text-center text-gray-500" style={{ fontFamily: "'SF Pro Display', sans-serif" }}>
              {tabContent[selectedTab].date} - View Only
            </h2>

            {tabContent[selectedTab] && (
              <>
                <div className="px-4 rounded">
                  <h3 className="text-xl font-extrabold" style={{ fontFamily: "'SF Pro Display', sans-serif" }}>{tabContent[selectedTab].title}</h3>
                </div>
                <div className="px-4 pb-5 rounded-lg text-white my-4" style={{ fontFamily: "'SF Pro Display', sans-serif", whiteSpace: "pre-line" }}>
                  {tabContent[selectedTab].text}
                </div>
                
                {selectedTab === 0 || 16 ? (
                  <img src={tabContent[selectedTab].thumbnail} alt="Note to Self" className="w-full h-auto px-4" />
                ) : (
                  tabContent[selectedTab].video && (
                    isYouTubeUrl(tabContent[selectedTab].video) ? (
                      <iframe
                        className="w-full aspect-video px-4"
                        src={getYouTubeEmbedUrl(tabContent[selectedTab].video)}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <video controls className="w-full h-auto px-4" poster={tabContent[selectedTab].thumbnail}>
                        <source src={tabContent[selectedTab].video} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )
                  )
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Mobile View */}
      <AnimatePresence>
        {isMobile && showContent && (
          <motion.div
            key="content"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="w-full bg-neutral-900 text-white p-4 fixed inset-0 z-50 overflow-y-auto"
          >
            <div onClick={handleBack} className="flex items-center mb-4 cursor-pointer">
              <span className="text-2xl mr-2">←</span> {/* Left-pointing arrow */}
              <span className="text-xl font-bold">Notes</span> {/* "Notes" text */}
            </div>
            <h2 className="mb-2 text-sm text-center text-gray-500">
              {tabContent[selectedTab].date} - View Only
            </h2>
            <h3 className="px-4 pt-4 text-lg font-extrabold">{tabContent[selectedTab].title}</h3>
            <div className="px-4 pb-10 rounded-lg text-white my-4" style={{ fontFamily: "'SF Pro Display', sans-serif", whiteSpace: "pre-line" }}>{tabContent[selectedTab].text}</div>
            {selectedTab === 0 ? (
              <img src={tabContent[selectedTab].thumbnail} alt="Note to Self" className="mt-5 w-full h-auto" />
            ) : (
              tabContent[selectedTab].video && (
                isYouTubeUrl(tabContent[selectedTab].video) ? (
                  <iframe
                    className="w-full aspect-video px-4"
                    src={getYouTubeEmbedUrl(tabContent[selectedTab].video)}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <video controls className="mt-5 w-full h-auto" poster={tabContent[selectedTab].thumbnail}>
                    <source src={tabContent[selectedTab].video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}