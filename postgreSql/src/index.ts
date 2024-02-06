import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const fetchData = async () => {
  const res = await prisma.user.findMany({});
  console.log(res);
};

const insertData = async (
  email: string,
  firstName: string,
  lastName: string,
  password: string
) => {
  const res = await prisma.user.create({
    data: {
      email,
      firstName,
      lastName,
      password,
    },
  });
  console.log(res);
  
};


const updateData = async(email:string , firstName:string) =>{
  const res = await prisma.user.update({
    where:{email},
    data:{
      firstName,
    }
  })
  console.log(res);
  fetchData();
  
}

// insertData('luffy@onepience.com','monkey D','luffy','luffy1234');
// updateData('luffy@onepience.com','Monkey D');
// fetchData();


const insertTodo = async(title:string, description:string,user_id:number) =>{
  const res = await prisma.todos.create({
    data:{
      title,
      description,
      user_id,
    }
  })
  console.log(res);
}

const getUserAndTodos = async(user_id:number) =>{
  const res = await prisma.todos.findMany({
    where:{user_id},
    select:{
      user:true,
      title:true,
      description:true,
    }
  })
  console.log(res);
  
}

getUserAndTodos(1);



// insertTodo('go to gym','heyy going to make you healthier', 1);