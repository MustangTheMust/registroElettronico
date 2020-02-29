import React from "react"
import { Icon, Modal, Tooltip, Tabs } from "antd";
import ImageScale from "../ImageScale";
import ConfigForm from "./ConfigForm";

export interface IProps{
    readonly corso: number
}
export interface IState{}

export default class ConfigCalendar extends React.PureComponent<IProps, IState>{
    showHelp = () => {
        Modal.info({
            width: 700,
            style: { top: 24 },
            centered: false,
            maskClosable: true,
            icon: <Icon type="question-circle" style={{ marginTop: 6, fontSize: 28, color: "orange" }} />,
            okText: "Ho capito",
            content: <div className="text-justify">
                <strong>Dove mi trovo?</strong>
                <p>In questa pagina potrai configurare il calendario dal quale verranno caricate le lezioni del corso.</p>
                <strong>Come si configura il calendario?</strong>
                <p>Per configurare il calendario avrai bisogno di due codici univoci, che ti permetteranno di collegare il calendario al sito.</p>
                <strong>API Key</strong>
                <p>Per trovare la chiave API, bisognerà recarsi a <a href="https://developers.google.com/calendar/quickstart/js?hl=it" target="_blank" rel="noopener noreferrer">questo <i className="far fa-external-link"></i></a> indirizzo ed effettuare il login con un qualsiasi account Google. Scendere in basso e cliccare sul bottone <strong>Create API Key</strong> (Crea chiave API), ed attendere il caricamento. Apparirà a schermo una finestra contentente la chiave: basterà copiare il codice ed inserirlo in questa pagina di configurazione.
                <u className="d-block">Ricordare che l'API Key può essere la stessa per entrambi i calendari (primo e secondo anno).</u>
                </p>
                <strong>ID del calendario</strong>
                <p>Per trovare l'ID (identificativo) del calendario, basterà effettuare l'accesso su <a href="https://calendar.google.com/" target="_blank" rel="noopener noreferrer">Google Calendar <i className="far fa-external-link"></i></a> con un account che abbia integrato il calendario del corso. Bisognerà poi premere sul simbolo <i className="far fa-cog"></i> in alto a destra e successivamente su <strong>Impostazioni</strong> nel menu che comparirà. Scorrere quindi la lista a sinistra della pagina, e cliccare sul calendario che si desidera integrare. Recarsi quindi sotto la voce <strong>Integra calendario</strong> e copiare (subito in basso) il codice identificativo del calendario (<strong>ID calendario</strong>), per poi incollarlo in questa pagina di configurazione.</p>
                <strong className="d-block mb-2">Galleria immagini</strong>
                <ImageScale src="https://i.imgur.com/u1qM1oD.png" width={143} />
                <ImageScale src="https://i.imgur.com/g0IjAtJ.png" scalable={true} height={100} />
                <ImageScale src="https://i.imgur.com/e3H0hXX.png" height={100} scalable={true} />
            </div>
        })

        setTimeout(() => document.getElementsByClassName('ant-modal-wrap')[0].scrollTo(0, 0), 100);
    }

    render(): JSX.Element{
        const { TabPane } = Tabs;

        return <div className="col px-5 py-4 right-block">
            <h3 className="mb-2 text-center">
                Configurazione calendario
                <Tooltip title="Informazioni">
                    <button type="button" className="btn btn-info circle-btn float-right" onClick={this.showHelp}>
                        <i className="fa fa-question"></i>
                    </button>
                </Tooltip>
                <div className="clearfix"></div>
            </h3>

            <Tabs>
                <TabPane tab="Primo anno" key="1">
                    <ConfigForm anno={1} corso={this.props.corso} />
                </TabPane>
                <TabPane tab="Secondo anno" key="2">
                    <ConfigForm anno={2} corso={this.props.corso} />
                </TabPane>
            </Tabs>
        </div>
    }
}