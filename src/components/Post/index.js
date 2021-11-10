import { CardComent, CardPost } from "./styles";
import imgProfile from "../../assets/profile.png"
import { useState } from "react";
import { getUser } from "../../services/security";
import { api } from "../../services/api";
import { format } from "date-fns";
import Input from "../../components/Input";


/*
absolute path: /src/components/Post/index.js
*/


function Post({ data }) {
    let signedUser = getUser();

    const [showComents, setShowComents] = useState(false);
    const toggleComents = () => setShowComents(!showComents);

    const [coments, setComents] = useState(data.Answers);

    const [novaResposta, setNovaResposta] = useState({
        description:""
    });

    const handleInput = (e) => {
        setNovaResposta({ ...novaResposta, [e.target.id]: e.target.value });
    }

    const handleSubmitResposta = async (e) => {
        e.preventDefault();

        let idPost = data.id;
        let uri = "/questions/" + idPost + "/answers/";

        try{
            let newComent = await api.post(uri, {description: novaResposta.description});
            setComents([...coments, newComent.data]);
        } catch(error){
            alert(error);
        }
    };

    return (
        <CardPost>
            <header>
                <img src={imgProfile} />
                <div>
                    <p>por {signedUser.studentId === data.Student.id ? "você" : data.Student.name}</p>
                    <span>em {format(new Date(data.created_at), "dd/MM/yyyy 'às' HH:mm")}</span>
                </div>
            </header>
            <main>
                <div>
                    <h2>{data.title}</h2>
                    <p>{data.description}</p>
                </div>
                {data.image && <img src={data.image} alt="imagem do post" />}
                <footer>
                    {data.Categories.map(c => <p>{c.description}</p>)}
                </footer>
            </main>
            <footer>
                <h3 onClick={toggleComents}>
                    {
                        coments.length === 0 ?
                            "Comente primeiro!" :
                            `${coments.length} Comentário${coments.length > 1 && "s" , ""}`
                    }
                </h3>
                {showComents && (
                    <>
                        {coments.map(c => <Coment coment={c} />)}
                    </>
                )}

                <form onSubmit={handleSubmitResposta}>
                    <div>
                        <Input id="description" required handler={handleInput} />
                        <button>Enviar</button>
                    </div>
                </form>
            </footer>
        </CardPost>
    );
}

function Coment({ coment }) {
    return (
        <CardComent>
            <header>
                <img src={coment.Student?.image} />
                <div>
                    <p>{coment.Student?.name}</p>
                    <span>{format(new Date(coment.created_at || coment.createdAt), "dd/MM/yyyy 'às' HH:mm")}</span>
                </div>
            </header>
            <p>{coment.description}</p>
        </CardComent>
    );
}

export default Post;