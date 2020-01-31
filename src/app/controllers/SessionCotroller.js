import jwt from 'jsonwebtoken';
import User from '../models/User';
import autConfig from '../../config/auth';

class SessionControler {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    // validaçãoes de senha
    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Senha Inválida' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, autConfig.secret, {
        expiresIn: autConfig.expiresIn,
      }),
    });
  }
}

export default new SessionControler();
