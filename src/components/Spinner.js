import React, { useEffect, useState } from "react";

function Spinner(props) {
    const [ratio, setRatio] = useState("ratio: 1");

    useEffect(() => {
        if (Number.isInteger(props.ratio)) {
            setRatio(`ratio: ${props.ratio}`);
        } else {
            setRatio("ratio: 1");
        }

    },[props.ratio])


    return (
        <>
            <div uk-spinner={ratio}></div>
            <div className="uk-text-meta">{props.text}</div>
        </>
    );
}

export default Spinner;