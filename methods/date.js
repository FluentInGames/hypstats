module.exports = {
    name: "date",
    async execute(timestamp) {
        let date = new Date(timestamp);

        let day = date.getDay() < 10 ? "0" + date.getDay() : date.getDay();
        let month = date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth();
        let year = date.getFullYear();

        return `${day}/${month}/${year}`;
    },
};