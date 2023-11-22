import { NextApiRequest, NextApiResponse } from 'next'

const tools = [
    { name: 'python-fastapi', tool_id: 100 },
    { name: 'python-django', tool_id: 101 },
    { name: 'python-flask', tool_id: 102 },
    { name: 'python-numpy', tool_id: 103 },
    { name: 'python-pandas', tool_id: 104 },
    { name: 'python-matplotlib', tool_id: 105 },
    { name: 'python-pytorch', tool_id: 106 },
    { name: 'python-seaborn', tool_id: 107 },
    { name: 'python-tensorflow', tool_id: 108 },
    { name: 'python-opencv', tool_id: 109 },
    { name: 'python-sklearn', tool_id: 110 },
    { name: 'typescript-nextjs', tool_id: 213 },
    { name: 'typescript-nuxtjs', tool_id: 214 },
    { name: 'typescript-react', tool_id: 215 },
    { name: 'typescript-vue', tool_id: 216 },
    { name: 'typescript-express', tool_id: 217 },
    { name: 'typescript-nestjs', tool_id: 218 },
    { name: 'javascript-jquery', tool_id: 219 },
    { name: 'php-cakephp', tool_id: 300 },
    { name: 'php-laravel', tool_id: 301 },
    { name: 'php-symfony', tool_id: 302 },
    { name: 'ruby-rubyonrails', tool_id: 400 },
    { name: 'go-gin', tool_id: 500 },
    { name: 'go-echo', tool_id: 501 }
]

export default (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).json(tools)
}
