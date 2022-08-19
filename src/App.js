import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import DocumentChecker from "./DocumentChecker";
import DocumentUploader from "./DocumentUploader"
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="doc_check" element={<DocumentChecker />} />
        <Route path="doc_upload" element={<DocumentUploader />} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
