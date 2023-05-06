import {useParams} from "react-router-dom";

function ProductScreen(){
    const params = useParams();
    const {slug} = params
    return(
        <div>
            <h3>{slug}</h3>
        </div>
    )
}

export default ProductScreen;