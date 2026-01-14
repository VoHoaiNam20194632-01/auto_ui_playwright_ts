export const invalidFormData = [
    {
        testCaseName: 'Verify all message all field empty',
        input:{
          'Full Name':{
                value:'',
                message:'Please input your full name!',
          }, 
          'Email':{
                value:'',
                message:'Please input your email!',
          }, 
          'Phone Number':{
                value:'',
                message:'Please input your phone number!',
          },
          'Date of Birth':{
                value:'',
                message:'Please select your date of birth!You must be at least 18 years old!',
          },
          'Address':{
                value:'',
                message:'Please input your address!',
          }
        }
    },
    {
        testCaseName: 'Verify message When Phone Number and Birthday are invalid',
        input:{
          'Full Name':{
                value:'',
                message:'Please input your full name!',
          }, 
          'Email':{
                value:'',
                message:'Please input your email!',
          }, 
          'Phone Number':{
                value:'123456',
                message:'Phone number must be 10 digits!',
          },
          'Date of Birth':{
                value:'2026-01-05',
                message:'You must be at least 18 years old!',
          },
          'Address':{
                value:'',
                message:'Please input your address!',
          }
        }
    }
]


export const validFormData = [
    {
        testCaseName: 'Verify all message all field empty',
        input:{
          'Full Name':'vo hoai nam', 
          'Email':'vohoainam650@gmail.com', 
          'Phone Number':'0866843576',
          'Date of Birth':'2001-08-24',
          'Address':'hong son , do luong, nghe an',
        }
    }
]