import React from "react"
import { NavLink, Route, Router, Switch } from "react-router-dom"
import { routerHistory } from "../.."
import LoginTutor from "./LoginTutor"
import StudentsList from "./StudentsList"
import AddNewStudent from "./AddNewStudent"
import StudentDetails from "./StudentDetails"
import DocentiList from "./DocentiList"
import AddNewDocente from "./AddNewDocente"
import DocenteDetails from "./DocenteDetails"
import EditDocente from "./EditDocente"
import EditStudente from "./EditStudente"
import StudentsImport from "./StudentsImport"
import MaterieList from "./MaterieList"
import ConfigCalendar from "./ConfigCalendar"
import { IAdmin } from "../../models/IAdmin"
import LogoCorso from "../LogoCorso"
import Page404 from "../Page404"
import { adminRoute } from "../../utilities"

export default class Dashboard extends React.Component{

    componentWillUnmount = () => {
        sessionStorage.removeItem("adminSession")
    }

    render(): JSX.Element{

        let session = sessionStorage.getItem("adminSession")
        
        if(!session)
            return <LoginTutor />

        let admin = JSON.parse(session) as IAdmin

        return <div className="container-fluid">
            <Router history={routerHistory}>
                <div className="row">
                    <div className="col-3 bg-blue p-0 menu">
                        
                        <LogoCorso idCorso={admin.idCorso} />

                        <NavLink className="router-link" activeClassName="active" onClick={() => routerHistory.push(adminRoute+"/studenti")} to={adminRoute+"/studenti"}>
                            <span>Studenti</span>
                        </NavLink>
                        <NavLink className="router-link" activeClassName="active" onClick={() => routerHistory.push(adminRoute+"/docenti")} to={adminRoute+"/docenti"}>
                            <span>Docenti</span>
                        </NavLink>
                        <NavLink className="router-link" activeClassName="active" onClick={() => routerHistory.push(adminRoute+"/materie")} to={adminRoute+"/materie"}>
                            <span>Materie</span>
                        </NavLink>
                        <NavLink className="router-link" activeClassName="active" onClick={() => routerHistory.push(adminRoute+"/config")} to={adminRoute+"/config"}>
                            <span>Configura calendario</span>
                        </NavLink>
                        <NavLink className="router-link" activeClassName="active" onClick={() => {
                            sessionStorage.removeItem("adminSession")
                            routerHistory.push(adminRoute)
                        }} exact to={adminRoute+"/login"}>
                            <span>Esci</span>
                        </NavLink>
                    </div>
  
                    <Switch>
                        <Route exact path={adminRoute} render={() => {
                            routerHistory.push(adminRoute+"/studenti")

                            return null
                        }} />

                        <Route exact path={adminRoute+"/studenti"} render={() => (
                            <StudentsList corso={admin.idCorso} />
                        )} />

                        <Route exact path={adminRoute+"/studenti/new"} render={() => (
                            <AddNewStudent corso={admin.idCorso} />
                        )} />

                        <Route exact path={adminRoute+"/studenti/import"} render={() => (
                            <StudentsImport corso={admin.idCorso} />
                        )} />

                        <Route exact path={adminRoute+"/studenti/:id"} render={(routeProps) => (
                            <StudentDetails {...routeProps} corso={admin.idCorso} />
                        )} />

                        <Route exact path={adminRoute+"/studenti/edit/:id"} render={(routeProps) => (
                            <EditStudente {...routeProps} corso={admin.idCorso} />
                        )} />

                        <Route exact path={adminRoute+"/docenti"} render={() => (
                            <DocentiList corso={admin.idCorso} />
                        )} />

                        <Route exact path={adminRoute+"/docenti/new"} render={() => (
                            <AddNewDocente corso={admin.idCorso} />
                        )} />

                        <Route exact path={adminRoute+"/docenti/:id"} render={(routeProps) => (
                            <DocenteDetails {...routeProps} corso={admin.idCorso} />
                        )} />

                        <Route exact path={adminRoute+"/docenti/edit/:id"} render={(routeProps) => (
                            <EditDocente {...routeProps} corso={admin.idCorso} />
                        )} />

                        <Route exact path={adminRoute+"/materie"} render={() => (
                            <MaterieList corso={admin.idCorso} />
                        )} />

                        <Route exact path={adminRoute+"/config"} render={() => (
                            <ConfigCalendar corso={admin.idCorso} />
                        )} />

                        <Route render={() => <Page404 goTo={adminRoute} />} />

                    </Switch>
                        
                </div>
            </Router>
        </div>
    }
}
