const CheckSumDigit = (num) => {
    var str = num.toString();
    var sum=0;
    for (let i = 0; i < 14; i++){
        if (i%2) {
            let temp = parseInt(str[i]) * 2;
            if (temp/10) {
                temp = Math.floor(temp / 10) + (temp % 10);
            }
            sum = sum + temp;
        }
        else { sum = sum + parseInt(str[i]); }
    }
    return (10 - (sum % 10));
}

exports.verify = (req, res) => {
    const IEMI = parseInt(req.params.iemi);
    const len = Math.max(Math.floor(Math.log10(Math.abs(IEMI))), 0) + 1;
    if (IEMI && len == 15) {
        const userLastDigit = IEMI % 10;
        const lastDigit = CheckSumDigit(IEMI);
        var correctIEMI = Math.floor(IEMI / 10);
        correctIEMI = correctIEMI * 10 + lastDigit;
        var resText = "The Entered number is valid!";
        if (lastDigit != userLastDigit) {
            resText = "The Entered number is invalid. Did you mean " + correctIEMI.toString() + "?"
            res.status(201).send({ responseText: resText, correct: 'false' });
        }
        else { res.status(201).send({ responseText: resText, correct: 'true' }); }
    }
    res.status(404).send('Invalid Entry');
};