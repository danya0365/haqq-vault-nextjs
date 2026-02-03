/**
 * AuthPresenterServerFactory
 * Factory for creating AuthPresenter instances on the server side
 * ✅ Injects the appropriate repository (Mock or Real)
 */

import { MockAuthRepository } from '@/src/infrastructure/repositories/mock/MockAuthRepository';
import { AuthPresenter } from './AuthPresenter';
// import { SupabaseAuthRepository } from '@/src/infrastructure/repositories/supabase/SupabaseAuthRepository';
// import { createServerSupabaseClient } from '@/src/infrastructure/supabase/server';

export class AuthPresenterServerFactory {
  static create(): AuthPresenter {
    // ✅ Use Mock Repository for development
    const repository = new MockAuthRepository();
    
    // ⏳ TODO: Switch to Supabase Repository when backend is ready
    // const supabase = createServerSupabaseClient();
    // const repository = new SupabaseAuthRepository(supabase);

    return new AuthPresenter(repository);
  }
}

export function createServerAuthPresenter(): AuthPresenter {
  return AuthPresenterServerFactory.create();
}
