package com.br.server.controller;

import com.br.server.entity.Mensagem;
import com.br.server.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class MessageController {
    @Autowired
    private MessageService service;

    @RequestMapping(value = "mensagem/buscar-mensagens", method =  RequestMethod.GET)
    public List<Mensagem> buscarUltimosProdutos()
    {
        return service.buscarMensagens();
    }

    @RequestMapping(value = "mensagem/salvar-mensagem", method =  RequestMethod.POST)
    public Mensagem salvarMensagem(@RequestBody Mensagem mensagem)
    {
        return service.salvarMensagem(mensagem);
    }
}