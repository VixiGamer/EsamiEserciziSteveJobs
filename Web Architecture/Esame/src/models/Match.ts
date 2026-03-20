import mongoose, { Schema, Document } from "mongoose";
//team 1 team 2 score 1 score 2, venue.
interface IMatch extends Document {
    team1: String;
    team2: String;
    score1: Number;
    score2: Number;
    venue: String;
}

const MatchSchema = new Schema<IMatch>(
     {
        team1: {type: String, required: true},
        team2: {type: String, required: true},
        score1: {type: Number, required: true},
        score2: {type: Number, required: true},
        venue: {type: String, required: true},
     },
     {timestamps: true}
);

const Match = mongoose.model<IMatch>("Match", MatchSchema);
export default Match;
