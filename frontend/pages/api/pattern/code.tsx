import { PatternCodeAPIRequest, PatternCodeAPIResponse } from '@/interfaces/interfaces'
import { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
    const requestBody: PatternCodeAPIRequest = req.body
    console.log(requestBody)

    const code: PatternCodeAPIResponse = {
        nrow: 32,
        language_id: 12,
        pattern_id: 12,
        content:
            'class RealService\n  def operation\n    puts "RealService: Performing operation..."\n  end\nend\n\nclass ProxyService\n  def initialize(real_service)\n    @real_service = real_service\n  end\n\n  def operation\n    authenticate_user\n    @real_service.operation\n    log_operation\n  end\n\n  def authenticate_user\n    puts "ProxyService: Authenticating user..."\n  end\n\n  def log_operation\n    puts "ProxyService: Logging operation..."\n  end\nend\n\n# Example usage\nreal_service = RealService.new\nproxy_service = ProxyService.new(real_service)\n\nproxy_service.operation\n'
    }

    res.status(200).json(code)
}
