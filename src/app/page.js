'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tabContent = [
  { title: "NOTE TO SELF", text: "A digital notepad in the palm of our hands: a space for our grocery lists, passwords, diary entries, and a host of other purposes, meant only for our eyes. The Apple Notes app has become ubiquitous, and yet the ways individuals utilize this application varies widely. The Spring ’25 cohort of MAC 242: Projects in Documentary Media invites you to explore the ways in which we utilize the Notes app, and how it takes shape in our daily lives. ", video: "", thumbnail: "", date: "February 1, 2025 at 10:00AM" },
  { title: "Placeholder title for Tab 2", text: "Placeholder text for Tab 2", video: "video2.mp4", thumbnail: "thumbnail2.jpg", date: "February 15, 2025 at 2:30PM" },
  { title: "Placeholder title for Tab 3", text: "Placeholder text for Tab 3", video: "video3.mp4", thumbnail: "thumbnail3.jpg", date: "March 3, 2025 at 1:00PM" },
  { title: "Placeholder title for Tab 4", text: "Placeholder text for Tab 4", video: "video4.mp4", thumbnail: "thumbnail4.jpg", date: "March 10, 2025 at 4:45PM" },
  { title: "Placeholder title for Tab 5", text: "Placeholder text for Tab 5", video: "video5.mp4", thumbnail: "thumbnail5.jpg", date: "February 20, 2025 at 9:15AM" },
  { title: "Placeholder title for Tab 6", text: "Placeholder text for Tab 6", video: "video6.mp4", thumbnail: "thumbnail6.jpg", date: "March 5, 2025 at 11:30PM" },
  { title: "Placeholder title for Tab 7", text: "Placeholder text for Tab 7", video: "video7.mp4", thumbnail: "thumbnail7.jpg", date: "February 28, 2025 at 3:00PM" },
  { title: "Placeholder title for Tab 8", text: "Placeholder text for Tab 8", video: "video8.mp4", thumbnail: "thumbnail8.jpg", date: "March 12, 2025 at 12:00PM" },
  { title: "Placeholder title for Tab 9", text: "Placeholder text for Tab 9", video: "video9.mp4", thumbnail: "thumbnail9.jpg", date: "February 25, 2025 at 5:30PM" },
  { title: "Placeholder title for Tab 10", text: "Placeholder text for Tab 10", video: "video10.mp4", thumbnail: "thumbnail10.jpg", date: "March 15, 2025 at 8:00AM" },
  { title: "Placeholder title for Tab 11", text: "Placeholder text for Tab 11", video: "video11.mp4", thumbnail: "thumbnail11.jpg", date: "February 5, 2025 at 6:00PM" },
  { title: "Placeholder title for Tab 12", text: "Placeholder text for Tab 12", video: "video12.mp4", thumbnail: "thumbnail12.jpg", date: "March 20, 2025 at 10:30AM" },
  { title: "Placeholder title for Tab 13", text: "Placeholder text for Tab 13", video: "video13.mp4", thumbnail: "thumbnail13.jpg", date: "February 10, 2025 at 7:45PM" },
  { title: "Placeholder title for Tab 14", text: "Placeholder text for Tab 14", video: "video14.mp4", thumbnail: "thumbnail14.jpg", date: "March 25, 2025 at 1:15PM" },
  { title: "Placeholder title for Tab 15", text: "Placeholder text for Tab 15", video: "video15.mp4", thumbnail: "thumbnail15.jpg", date: "February 18, 2025 at 4:00PM" },
  { title: "Placeholder title for Tab 16", text: "Placeholder text for Tab 16", video: "video16.mp4", thumbnail: "thumbnail16.jpg", date: "March 30, 2025 at 9:00AM" },
];
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
        <div className="w-3/4 bg-neutral-900 text-white">
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
                
                {tabContent[selectedTab].video && (
                  <video controls className="w-full h-auto px-4" poster={tabContent[selectedTab].thumbnail}>
                    <source src={tabContent[selectedTab].video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
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
            className="w-full bg-neutral-900 text-white p-4 fixed inset-0 z-50"
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
            <video controls className="mt-5 w-full h-auto" poster={tabContent[selectedTab].thumbnail}>
              <source src={tabContent[selectedTab].video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}