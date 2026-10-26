type QueryResult = {
  data: any[] | null;
  error: { message?: string } | null;
};

const emptyQueryResult = (): QueryResult => ({ data: [], error: null });

const buildChain = (data: any[] = []) => {
  const query: any = {
    select: () => query,
    order: () => query,
    eq: () => query,
    in: () => query,
    neq: () => query,
    limit: () => query,
    or: () => query,
    maybeSingle: async () => ({ data: data[0] ?? null, error: null }),
    update: async () => ({ data, error: null }),
    insert: async () => ({ data, error: null }),
    delete: async () => ({ data, error: null }),
    then: (resolve: (value: QueryResult) => void) => Promise.resolve(emptyQueryResult()).then(resolve),
  };

  return query;
};

export const supabase = {
  from: () => buildChain([]),
  auth: {
    getSession: async () => ({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => undefined } }, error: null }),
    signInWithPassword: async () => ({ data: { session: null }, error: null }),
    signOut: async () => ({ error: null }),
  },
};

export const isSupabaseConfigured = false;
