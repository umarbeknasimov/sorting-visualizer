const selectionSort = array => {
    const arr = [...array];

    const animations = [];

    for (let i = 0; i < arr.length; i++) {
        let smallestValIndex = i;
        let smallestVal = arr[i];
        for (let j = i + 1; j < arr.length; j++) {
            animations.push([[smallestValIndex, j, false]])
            if (arr[j] < smallestVal) {
                smallestValIndex = j;
                smallestVal = arr[j];
            }
        }
        if (smallestValIndex !== i) {
            const animation = [];
            animation.push([i, smallestValIndex, true]);
            animation.push([i, smallestVal]);
            animation.push([smallestValIndex, arr[i]]);
            animations.push(animation);
            arr[smallestValIndex] = arr[i];
            arr[i] = smallestVal;
        }
    }

    return animations;
}

export default selectionSort;