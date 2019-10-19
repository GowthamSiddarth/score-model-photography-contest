const { simpleMessageResponse } = require('../../../helper/response-entity/response-body');
const validateContest = require('../../../helper/validation/create-contest');

const Contest = require('../../../models/contest/Contest');

const createContest = (req, res) => {
    const { errors, isValid } = validateContest(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const { contestName, createdBy } = req.body;

    Contest.findOne({ name: contestName }).then(contest => {
        if (contest) {
            errors.contest_name = `Contest with name '${contestName}' already exists`;
            return res.status(400).json(errors);
        }

        const newContest = new Contest({
            name: contestName,
            created_by: createdBy
        });

        newContest.save()
            .then(_contest => res.json(simpleMessageResponse(true, "Contest Created")))
            .catch(err => {
                console.log(err);
                return res.status(500).json(simpleMessageResponse(false, "Contest Creation Failed!"));
            });
    });
}

module.exports = createContest;