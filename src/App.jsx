import { BrowserRouter, Route, Routes } from "react-router-dom"

//import layout
import Layout from "./layouts/layout"

//importpages
import Home from "./pages/homepage";
import Error404 from "./pages/error404";
import Historico from "./pages/historico"
import Importar from "./services/importar";

export default function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element ={<Home/>}/>
        <Route path="historico" element ={<Importar/>}/>
      </Route>
      <Route path="*" element={<Error404/>} />
    </Routes>
   </BrowserRouter> 
  )
}
