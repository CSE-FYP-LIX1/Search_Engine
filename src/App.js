import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SideBar from "./pages/layout/SideBar";
import SearchHome from "./pages/SearchHome";
import SearchResults from "./pages/SearchResults";
import MarketTrends from "./pages/MarketTrends";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SideBar/>}>
          <Route path="search" element={<SearchHome/>} />
          <Route path="search-results" element={<SearchResults/>} />
          <Route path="market-trends" element={<MarketTrends />} />
        </Route>
        <Route path="*" element={<Navigate to="search"/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;