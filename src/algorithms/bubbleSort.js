

// return list of animations
// [ [[index1, index2, change], [index1, newValue1], [index2, newValue2]], ... ] ]
const bubbleSort = array => {
    const arr = [...array];
    const animations = []
    for (let endIndex = arr.length - 2; endIndex >= 0; endIndex--) {
        for (let currIndex = 0; currIndex <= endIndex; currIndex++) {
            const swap = arr[currIndex + 1] < arr[currIndex];
            const animation = []
            if (swap) {
                animation.push([currIndex, currIndex + 1, true]);
                animation.push([currIndex, arr[currIndex + 1]]);
                animation.push([currIndex + 1, arr[currIndex]]);
                const temp = arr[currIndex];
                arr[currIndex] = arr[currIndex + 1];
                arr[currIndex + 1] = temp;
            } else {
                animation.push([currIndex, currIndex + 1, false]);
            }
            animations.push(animation);
        }
    }

    return animations;
}

export default bubbleSort;