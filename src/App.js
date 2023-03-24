import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SideBar from "./pages/layout/SideBar";
import SearchHome from "./pages/SearchHome";
import SearchResults from "./pages/SearchResults";
import StockTrends from "./pages/StockTrends";
import StockTrendsResults from "./pages/StockTrendsResults";
import { TrendiestTopics } from "./pages/TrendiestTopics";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SideBar/>}>
          <Route path="search" element={<SearchHome/>} />
          <Route path="search-results" element={<SearchResults/>} />
          <Route path="stock-trends" element={<StockTrends/>} />
          <Route path="stock-trends-results" element={<StockTrendsResults/>} />
          <Route path="trendiest-topics" element={<TrendiestTopics />} />
        </Route>
        <Route path="*" element={<Navigate to="search"/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;