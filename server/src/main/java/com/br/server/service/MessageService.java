package com.br.server.service;

import com.br.server.entity.Mensagem;
import com.br.server.repository.IMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {

    @Autowired
    private IMessageRepository repository;

    public List<Mensagem> buscarMensagens(){
        return repository.buscarMensagens();
    }

    public Mensagem salvarMensagem(Mensagem msg){
        return repository.save(msg);
    }
}
