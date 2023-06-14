export const HOME_CONTENT_CACHE = {
  KEY: 'HOME_CONTENTS',
  TTL: 1000 * 60 * 10,
} as const;

export const HOME_CURATION_CACHE = {
  KEY: 'HOME_CURATION',
  TTL: 1000 * 60 * 60 * 24,
} as const;

export const HOME_CATEGORY_CACHE = {
  KEY: 'HOME_CATEGORY',
  TTL: 1000 * 60 * 60 * 24,
};
