export const getYears = (start = 1970, end = 2025) => {
    return Array.from({ length: end - start }, (_, index) => ({
        value: `${start + index}`,
        label: `${start + index}`,
    }));
};

export const scrollTop = () => {
    window.scrollTo(0, 0)
}