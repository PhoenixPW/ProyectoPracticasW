
import MateriaCard from "../components/card"

const clases = [
    
 ]

export default function Home(){
    return(
        <div className="grid grid-cols-3 gap-4">
        {clases.map((clase, index) => (
        <MateriaCard key={index} clase={clase} />
      ))}
        </div>
    )
}
