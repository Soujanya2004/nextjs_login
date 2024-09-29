import { NextApiRequest, NextApiResponse } from 'next';
import { withSession } from '../../../lib/withSession';

const handler = withSession(async (req: NextApiRequest, res: NextApiResponse) => {
    req.session.destroy();
    res.status(200).json({ message: 'Logout successful' });
});

export default handler;
