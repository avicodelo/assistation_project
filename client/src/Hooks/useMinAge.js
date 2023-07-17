//SETS MIN AGE TO USE DE SERVICE

//Sets min age as 16
function useMinAge() {

    const today = new Date();
    const ageMil = 1000 * 3600 * 24 * 365 * 16;
    const ageAllowed = new Date(today.getTime() - ageMil);
    const dateFormated = [ageAllowed.getFullYear(), (ageAllowed.getMonth() + 1).toString().padStart(2, "0"), ageAllowed.getDate().toString().padStart(2, "0")].join("-");

    return dateFormated;
}

export {useMinAge};

