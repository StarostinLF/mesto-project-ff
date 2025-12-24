import { NextRequest, NextResponse, userAgent } from 'next/server';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export function proxy(request: NextRequest) {
	const agent = userAgent(request);
	const deviceType: DeviceType = (agent.device.type as DeviceType) || 'desktop';
	const response = NextResponse.next();

	response.cookies.set('deviceType', deviceType);

	return response;
}
