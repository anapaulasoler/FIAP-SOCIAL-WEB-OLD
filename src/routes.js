import { BrowserRouter, Route, Switch } from "react-router-dom";
import Feed from "./pages/Feed";
import NewPost from "./pages/NewPost";

function Router() {


    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Feed />
                </Route>
                <Route path="/new-post">
                    <NewPost />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Router;