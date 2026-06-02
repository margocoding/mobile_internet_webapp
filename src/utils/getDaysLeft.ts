export const getDaysLeft = (date: Date) => {
    const diff = date.getTime() - Date.now();

    return Math.max(
        Math.ceil(diff / (1000 * 60 * 60 * 24)),
        0
    );
};