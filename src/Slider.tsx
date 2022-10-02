const PLACEHOLDER_TEXT = "Type something...";

const Slider = () => {

    return (
        <div id="text-slider">
            <textarea id="text-container" placeholder={PLACEHOLDER_TEXT} />
            <pre id="text-display"></pre>
            <p id="text-marker">&#129170;</p>
        </div>
    );
}

export default Slider;
