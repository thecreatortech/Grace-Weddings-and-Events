import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for common Supabase operations
export async function signUpWithEmail(email: string, password: string, userData: any) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData,
    },
  });
  
  return { data, error };
}

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
}

// Database operations
export async function fetchData(table: string, query: any = {}) {
  let queryBuilder = supabase.from(table).select('*');
  
  // Apply filters if provided
  if (query.filters) {
    Object.entries(query.filters).forEach(([key, value]) => {
      queryBuilder = queryBuilder.eq(key, value);
    });
  }
  
  // Apply ordering if provided
  if (query.orderBy) {
    queryBuilder = queryBuilder.order(query.orderBy.column, { 
      ascending: query.orderBy.ascending 
    });
  }
  
  // Apply pagination if provided
  if (query.pagination) {
    queryBuilder = queryBuilder
      .range(
        query.pagination.page * query.pagination.pageSize, 
        (query.pagination.page + 1) * query.pagination.pageSize - 1
      );
  }
  
  const { data, error, count } = await queryBuilder;
  return { data, error, count };
}

export async function insertData(table: string, data: any) {
  const { data: result, error } = await supabase
    .from(table)
    .insert(data)
    .select();
  
  return { data: result, error };
}

export async function updateData(table: string, id: string, data: any) {
  const { data: result, error } = await supabase
    .from(table)
    .update(data)
    .eq('id', id)
    .select();
  
  return { data: result, error };
}

export async function deleteData(table: string, id: string) {
  const { error } = await supabase
    .from(table)
    .delete()
    .eq('id', id);
  
  return { error };
}

// Storage operations
export async function uploadFile(bucket: string, path: string, file: File) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: true
    });
  
  return { data, error };
}

export async function getFileUrl(bucket: string, path: string) {
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path);
  
  return data.publicUrl;
}

export async function deleteFile(bucket: string, path: string) {
  const { error } = await supabase.storage
    .from(bucket)
    .remove([path]);
  
  return { error };
}
