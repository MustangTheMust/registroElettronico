import React from "react"
import { Modal, Icon, Spin, Upload } from "antd";
import { routerHistory } from "../..";
import { siteUrl, imageFileToBase64 } from "../../utilities";
import Axios from "axios";
import { RouteComponentProps } from "react-router-dom";
import { ICorso } from "../../models/ICorso";

export interface IRouteParams{
    readonly id: string
}
export interface IProps extends RouteComponentProps<IRouteParams>{}
export interface IState{
    readonly corso: ICorso
    readonly nome: string
    readonly desc: string
    readonly luogo: string
    readonly logo: string
}

export default class EditCorso extends React.PureComponent<IProps, IState>{

    constructor(props: IProps){
        super(props)

        this.state = {
            corso: null,
            nome: "",
            desc: "",
            luogo: "",
            logo: null
        }
    }

    componentDidMount = () => {
        let id = Number(this.props.match.params.id)

        if(isNaN(id))
            routerHistory.push("/adminpanel")

        Axios.get(siteUrl+"/reg/api?corso&id=" + id).then((response) => {
            let corso = response.data as ICorso

            this.setState({
                corso: corso,
                nome: corso.nome,
                desc: corso.desc,
                luogo: corso.luogo,
                logo: corso.logo
            })
        })
    }

    changeNome = (event: any) => {
        let nome = event.target.value

        this.setState({
            nome: nome
        })
    }

    changeDesc = (event: any) => {
        let desc = event.target.value

        this.setState({
            desc: desc
        })
    }

    changeLuogo = (event: any) => {
        let luogo = event.target.value

        this.setState({
            luogo: luogo
        })
    }

    modificaCorso = () => {
        const { nome, desc, luogo } = this.state

        if(nome === "" || desc === "" || luogo === ""){
            Modal.error({
                title: "Errore!",
                content: "Riempire tutti i campi."
            })

            return
        }

        /***************************************/
        /* MODIFICA CORSO E POI MOSTRARE MODAL */
        /***************************************/

        Modal.success({
            title: "Complimenti!",
            content: "Corso modificato con successo.",
            onOk: () => {
                routerHistory.push("/adminpanel/corsi")
            }
        })

    }

    convertImage = (file: any) => {
        imageFileToBase64(file).then(result => {
            this.setState({
                logo: String(result)
            })
        })

        return false
    }

    render(): JSX.Element{
        const { nome, desc, luogo, corso, logo } = this.state,
        uploadButton = (
            <div>
                <Icon type="plus" style={{ fontSize: 30, marginBottom: 5 }} />
                <div className="ant-upload-text">Carica immagine</div>
            </div>
        )

        if(!corso){
            const icon = <Icon type="loading" style={{ fontSize: 50 }} spin />;

            return <div className="col-9 px-5 py-4 right-block" id="mainBlock">
                <Spin indicator={icon} />
            </div>
        }

        return <div className="col-9 px-5 py-4 right-block">
            <h3 className="mb-2 text-center">Modifica di un corso</h3>

            <form className="row">
                <div className="form-group mr-3">
                    <label className="text-secondary d-block">Logo</label>
                    <Upload listType="picture-card" showUploadList={false} beforeUpload={(file) => this.convertImage(file)} className="logo-upload" accept="image/*">
                        {logo ? <img src={logo} alt="logo" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                </div>

                <div className="col">
                    <div className="form-group row">
                        <div className="col">
                            <label className="text-secondary">Nome</label>
                            <input type="text" className="form-control" value={nome} onChange={this.changeNome} />
                        </div>
                        <div className="col">
                            <label className="text-secondary">Luogo</label>
                            <input type="text" className="form-control" value={luogo} onChange={this.changeLuogo} />
                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="col">
                            <label className="text-secondary">Breve descrizione</label>
                            <textarea className="form-control" rows={2} onChange={this.changeDesc}>{desc}</textarea>
                        </div>
                    </div>
                </div>

                <button type="button" className="btn btn-success text-uppercase w-100" onClick={this.modificaCorso}>Modifica corso</button>
            </form>
        </div>
    }
}