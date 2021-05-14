module.exports = (val, max, min, inverted = false) => {
    let normalized = (val - min) / (max - min);
    return inverted ? 1 - normalized : normalized; // Inverted
}