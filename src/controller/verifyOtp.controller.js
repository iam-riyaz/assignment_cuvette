import bcrypt from 'bcrypt';
import { User } from '../model/user.js';

export const verifyOtp= async(req,res)=>{
    
    try{

    const {id}=req.params
    const {enteredOTP,hashedOTP}= req.body

    const isOtpMatched= await bcrypt.compare(enteredOTP,hashedOTP)
    if(isOtpMatched){

        const user= await User.findByIdAndUpdate({_id:id},{$set:{isVerified:true}},{new:true})
        if(!user){
            res.status(404).send({message: 'User not found'})
        }
      const updatedUser= await user.save()
        res.status(200).send({isOTPVerified:true, updatedUser})

    }





    }
    catch(err){

        res.status(500).send(err.message)

    }


}