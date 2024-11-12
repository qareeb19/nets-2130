// // src/app/callback/route.ts

// import { NextResponse } from 'next/server'
// import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
// import type { NextRequest } from 'next/server'
// import { cookies } from 'next/headers'

// export async function GET(req: NextRequest) {
//     const supabase = createRouteHandlerClient({ cookies: () => cookies() })

//     // Handle the magic link
//     const { data, error } = await supabase.auth.getSessionFromUrl({ storeSession: true })

//     if (error) {
//         console.error('Error handling magic link:', error)
//         return NextResponse.redirect('/login?error=Authentication%20failed.')
//     }

//     // Redirect to the home page or desired route after successful login
//     return NextResponse.redirect('/play')
// }
