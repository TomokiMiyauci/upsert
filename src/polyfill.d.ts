/** Handler for emplace. */
interface EmplaceHandler<K, V, T>
  extends Insertable<K, V, T>, Updatable<K, V, T> {}

/** Insertable API. */
interface Insertable<K, V, T> {
  /** Add entry. */
  insert: InsertCallback<K, V, T>;
}

/** Updatable API. */
interface Updatable<K, V, T> {
  /** Update the value. */
  update: UpdateCallback<K, V, T>;
}

interface InsertCallback<K, V, T = unknown> {
  (key: K, that: T): V;
}

interface UpdateCallback<K, V, T> {
  (existing: V, key: K, that: T): V;
}

/** Emplaceable API. */
interface Emplaceable<K, V> {
  /** Add a value to a map if the map does not already have something at {@link key}, and will also update an existing value at {@link key}. */
  emplace(key: K, handler: EmplaceHandler<K, V, this>): V;
  emplace(key: K, handler: Insertable<K, V, this>): V;
  emplace(key: K, handler: Updatable<K, V, this>): V | undefined;
}

interface Map<K, V> extends Emplaceable<K, V> {}

interface WeakMap<K, V> extends Emplaceable<K, V> {}
