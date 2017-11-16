export const green = '#00CC00';
export const yellow = '#F7FF36';
export const orange = '#FF950B';
export const red = '#FD0000';

export const randomColor = () => {
    let randomColors = [yellow, orange, red];
    let randomIndex = Math.floor(Math.random() * 3);
    return randomColors[randomIndex]
};