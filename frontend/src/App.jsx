import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Post } from "./Pages/CreatePost";
import { SinglePost } from "./Pages/SingleDump";
function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/posssttt" element={<Post />}></Route>
        <Route path="/post/:id" element={<SinglePost />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;