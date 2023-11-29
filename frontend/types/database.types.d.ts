export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  next_auth: {
    Tables: {
      accounts: {
        Row: {
          access_token: string | null
          expires_at: number | null
          id: string
          id_token: string | null
          oauth_token: string | null
          oauth_token_secret: string | null
          provider: string
          providerAccountId: string
          refresh_token: string | null
          scope: string | null
          session_state: string | null
          token_type: string | null
          type: string
          userId: string | null
        }
        Insert: {
          access_token?: string | null
          expires_at?: number | null
          id?: string
          id_token?: string | null
          oauth_token?: string | null
          oauth_token_secret?: string | null
          provider: string
          providerAccountId: string
          refresh_token?: string | null
          scope?: string | null
          session_state?: string | null
          token_type?: string | null
          type: string
          userId?: string | null
        }
        Update: {
          access_token?: string | null
          expires_at?: number | null
          id?: string
          id_token?: string | null
          oauth_token?: string | null
          oauth_token_secret?: string | null
          provider?: string
          providerAccountId?: string
          refresh_token?: string | null
          scope?: string | null
          session_state?: string | null
          token_type?: string | null
          type?: string
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "accounts_userId_fkey"
            columns: ["userId"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      sessions: {
        Row: {
          expires: string
          id: string
          sessionToken: string
          userId: string | null
        }
        Insert: {
          expires: string
          id?: string
          sessionToken: string
          userId?: string | null
        }
        Update: {
          expires?: string
          id?: string
          sessionToken?: string
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sessions_userId_fkey"
            columns: ["userId"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          email: string | null
          emailVerified: string | null
          id: string
          image: string | null
          name: string | null
        }
        Insert: {
          email?: string | null
          emailVerified?: string | null
          id?: string
          image?: string | null
          name?: string | null
        }
        Update: {
          email?: string | null
          emailVerified?: string | null
          id?: string
          image?: string | null
          name?: string | null
        }
        Relationships: []
      }
      verification_tokens: {
        Row: {
          expires: string
          identifier: string | null
          token: string
        }
        Insert: {
          expires: string
          identifier?: string | null
          token: string
        }
        Update: {
          expires?: string
          identifier?: string | null
          token?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      uid: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      algorithm: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      algorithm_code: {
        Row: {
          algorithm_id: number
          content: string
          created_at: string
          id: number
          language_id: number
          nrow: number
        }
        Insert: {
          algorithm_id: number
          content: string
          created_at?: string
          id?: number
          language_id: number
          nrow: number
        }
        Update: {
          algorithm_id?: number
          content?: string
          created_at?: string
          id?: number
          language_id?: number
          nrow?: number
        }
        Relationships: [
          {
            foreignKeyName: "algorithm_code_algorithm_id_fkey"
            columns: ["algorithm_id"]
            referencedRelation: "algorithm"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "algorithm_code_language_id_fkey"
            columns: ["language_id"]
            referencedRelation: "language"
            referencedColumns: ["id"]
          }
        ]
      }
      category: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      framework: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      framework_code: {
        Row: {
          content: string
          created_at: string
          id: number
          nrow: number
          tool_id: number
        }
        Insert: {
          content: string
          created_at?: string
          id?: number
          nrow: number
          tool_id: number
        }
        Update: {
          content?: string
          created_at?: string
          id?: number
          nrow?: number
          tool_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "framework_code_tool_id_fkey"
            columns: ["tool_id"]
            referencedRelation: "tool"
            referencedColumns: ["id"]
          }
        ]
      }
      language: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      language_code: {
        Row: {
          content: string
          created_at: string
          id: number
          language_id: number
          nrow: number
        }
        Insert: {
          content: string
          created_at?: string
          id?: number
          language_id: number
          nrow: number
        }
        Update: {
          content?: string
          created_at?: string
          id?: number
          language_id?: number
          nrow?: number
        }
        Relationships: [
          {
            foreignKeyName: "language_code_language_id_fkey"
            columns: ["language_id"]
            referencedRelation: "language"
            referencedColumns: ["id"]
          }
        ]
      }
      pattern: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      pattern_code: {
        Row: {
          content: string
          created_at: string
          id: number
          language_id: number
          nrow: number
          pattern_id: number
        }
        Insert: {
          content: string
          created_at?: string
          id?: number
          language_id: number
          nrow: number
          pattern_id: number
        }
        Update: {
          content?: string
          created_at?: string
          id?: number
          language_id?: number
          nrow?: number
          pattern_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "pattern_code_language_id_fkey"
            columns: ["language_id"]
            referencedRelation: "language"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pattern_code_pattern_id_fkey"
            columns: ["pattern_id"]
            referencedRelation: "pattern"
            referencedColumns: ["id"]
          }
        ]
      }
      tool: {
        Row: {
          framework_id: number
          id: number
          language_id: number
        }
        Insert: {
          framework_id: number
          id: number
          language_id: number
        }
        Update: {
          framework_id?: number
          id?: number
          language_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "tool_framework_id_fkey"
            columns: ["framework_id"]
            referencedRelation: "framework"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tool_language_id_fkey"
            columns: ["language_id"]
            referencedRelation: "language"
            referencedColumns: ["id"]
          }
        ]
      }
      user_log_problem: {
        Row: {
          category_id: number
          correct: number
          created_at: string
          miss: number
          problem_id: number
          speed: number
          user_id: string
        }
        Insert: {
          category_id: number
          correct: number
          created_at?: string
          miss: number
          problem_id: number
          speed: number
          user_id: string
        }
        Update: {
          category_id?: number
          correct?: number
          created_at?: string
          miss?: number
          problem_id?: number
          speed?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_log_problem_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_log_problem_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_log_summaray: {
        Args: {
          user_id_input: string
        }
        Returns: {
          month: string
          miss: number
          speed: number
        }[]
      }
      get_user_log_summary: {
        Args: {
          user_id_input: string
        }
        Returns: {
          month: string
          correct: number
          miss: number
          speed: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "buckets_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

