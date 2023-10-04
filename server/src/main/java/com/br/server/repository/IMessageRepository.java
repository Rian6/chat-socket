package com.br.server.repository;

import com.br.server.entity.Mensagem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IMessageRepository extends JpaRepository<Mensagem, Long> {

    @Query("SELECT pp FROM Mensagem pp")
    List<Mensagem> buscarMensagens();
}
