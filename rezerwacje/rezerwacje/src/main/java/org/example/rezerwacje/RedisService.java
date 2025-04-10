package org.example.rezerwacje;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
public class RedisService {
    @Autowired
    private StringRedisTemplate redisTemplate;

    public void saveCode(String userId, String code) {
        redisTemplate.opsForValue().set(userId, code, 10, TimeUnit.MINUTES);
    }

    public String getCode(String userId) {
        return redisTemplate.opsForValue().get(userId);
    }

    public void deleteCode(String userId) {
        redisTemplate.delete(userId);
    }

    public boolean exists(String key) {
        return Boolean.TRUE.equals(redisTemplate.hasKey(key));
    }
}
