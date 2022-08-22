import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import DocumentChecker from "./DocumentChecker";
import DocumentUploader from "./DocumentUploader"
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route  path="/" element={<Layout />}>
        <Route index path="/" element={<DocumentChecker />} />
        <Route path="doc_upload" element={<DocumentUploader />} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
