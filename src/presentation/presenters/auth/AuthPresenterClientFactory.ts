/**
 * AuthPresenterClientFactory
 * Factory for creating AuthPresenter instances on the client side
 * ✅ Injects the appropriate repository (Mock or Real)
 */

'use client';

import { MockAuthRepository } from '@/src/infrastructure/repositories/mock/MockAuthRepository';
import { AuthPresenter } from './AuthPresenter';
// import { SupabaseAuthRepository } from '@/src/infrastructure/repositories/supabase/SupabaseAuthRepository';
// import { supabase } from '@/src/infrastructure/supabase/client';

export class AuthPresenterClientFactory {
  static create(): AuthPresenter {
    // ✅ Use Mock Repository for development
    const repository = new MockAuthRepository();
    
    // ⏳ TODO: Switch to Supabase Repository when backend is ready
    // const repository = new SupabaseAuthRepository(supabase);

    return new AuthPresenter(repository);
  }
}

export function createClientAuthPresenter(): AuthPresenter {
  return AuthPresenterClientFactory.create();
}
