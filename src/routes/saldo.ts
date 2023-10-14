import { Router } from "express";
import { checkRA, getSaldo } from "../controllers/aluno_controller";

const router = Router();

router.post("/", async (req, res) => {
  const body = req.body;

  const saldo = await getSaldo({ ra: body.ra, senha: body.senha });
  res.send(saldo);
});

router.post("/ra", async (req,res)=>{
  const body = req.body
  console.log(body)
  const aluno = await checkRA({ ra: body.ra, senha: body.senha })
  console.log(aluno)
  if(!aluno) res.send(false)
  res.send(aluno);
})
export default router;
