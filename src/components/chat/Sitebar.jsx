import React, {useState} from "react";

import Chats from "./Chats"

const Sidebar = (onHandleSelectParent) => {
    const [show, setShow] = useState(true);

    const onBack = () => {
        setShow(true);
    }
    return (
        <div className="sidebar shadow"> <Chats  onBack={onBack}/> </div>
    );
};

export default Sidebar;